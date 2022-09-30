import { repoCreateCourse, repoCourseByID, repoGetCourse, repoDeleteCourse, repoGetCourseByOrg, repoUpdateCourse, repoCheckCourseEmployee, repoCreateCourseEmployee, repoGetMyCourses, repoCreateCertificate, repoGetCourseEmpById, repoGetCertificateByCourseEmp } from "../repositories/CourseRepository.js";
import { repoGetHeadOfDept, repoUserById } from "../repositories/UserRepository.js";
import moment from 'moment';
import { errMsg, randomString } from "../helper/Helper.js";
import { repoGetFirstLesson, repoGetLessonByCourse, repoGetLessonByCourseEmp } from "../repositories/LessonRepository.js";
import { repoGetExamByCourse, repoGetExamEmpByEmployee } from "../repositories/ExamRepository.js";
import { repoGetQuizByCourse, repoGetQuizEmpByEmployee } from "../repositories/QuizRepository.js";
import PDFDocument from "pdfkit";
import fs from "fs";

export const addCourse = async(req, res) => {
    try {
        const data =  {
            course_name : req.body.course_name,
            description : req.body.description,
            organization_code : req.body.organization_code,
            due_date : req.body.due_date,
            created_by : req.body.created_by
        };
        await repoCreateCourse(data);
        return res.json({
            message : 'Corse berhasil ditambah',
            is_error :false
        });
    } catch(err) {
        return res.json({
            is_error : true,
            message : err
        });
    }
}

export const updateCourse = async(req, res) => {
    try{
        const data = {
            course_name : req.body.course_name,
            description : req.body.description,
            organization_code : req.body.organization_code,
            due_date : req.body.due_date,
            created_by : req.body.created_by
        };
        await repoUpdateCourse(data, req.params.id);
        return res.json({
            message : 'Course berhasil diupdate',
            is_error : false
        });
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        });
    }
}

export const deleteCourse = async(req, res) => {
    try {
        await repoDeleteCourse(req.params.id);
        res.json({
            message : 'Course berhasil dihapus',
            is_error : false
        });
    } catch(err) {
        res.json({
            message : err,
            is_error : true
        })
    }
}

export const getCourse = async(req, res) => {
    try {
        const courses = await repoGetCourse();
        return res.json({
            data : courses,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getCourseById = async(req, res) => {
    try {
        const course = await repoCourseByID(req.params.id);
        return res.json({
            data : course,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const getCourseByOrg = async(req, res) => {
    try {
        const course = await repoGetCourseByOrg(req.body.organization_code);
        return res.json({
            data : course,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const enrollCourse = async(req ,res) => {
    try {
        const courseId = req.body.data.course_id;
        const employeeId = req.body.data.employee_id;
        const course = await repoCourseByID(courseId);
        if(!course){
            return res.json({
                message : 'Course tidak ditemukan',
                is_error : true
            });
        }
        const now = moment(new Date()).format('YYYY-MM-DD');
        if(course.due_date < now){
            return res.json({
                message : 'Course sudah kadaluarsa',
                is_error : true
            });
        }
        const user = await repoUserById(employeeId);
        if(!user) {
            return res.json({
                message : 'Employee tidak ditemukan',
                is_error : true
            });
        }
        const courseEmployee = await repoCheckCourseEmployee(courseId, employeeId);
        if(courseEmployee){
            return res.json({
                message : 'Anda sudah mengambil course ini',
                is_error : true
            });
        }
        const firstLesson = await repoGetFirstLesson(courseId);
        const data = {
            employee_id : employeeId,
            course_id : courseId,
            progress : 0,
            status : 'In Progress'
        };
        await repoCreateCourseEmployee(data);
        return res.json({
            data : {
                first_lesson : firstLesson
            },
            message : 'Course berhasil di enroll',
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : err,
            is_error : true
        });
    }
}

export const unEnrollCourse = async(req, res) => {

}

export const getMyCourses = async(req, res) => {
    try {
        const myCourses = await repoGetMyCourses(req.body.employee_id);
        return res.json({
            data : myCourses,
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}

export const getListContent = async(req, res) => {
    try {
        const employeeId = req.body.data.employee_id
        const courseId = req.body.data.course_id;
        const lessonsEmp = await repoGetLessonByCourseEmp(courseId, employeeId);
        const exams = await repoGetExamEmpByEmployee(courseId, employeeId);
        const quiz = await repoGetQuizEmpByEmployee(courseId, employeeId);
        return res.json({
            data : {
                lessons : lessonsEmp,
                quiz : quiz,
                exams : exams,
            },
            is_error : false
        });
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        })
    }
}


export const generateCertificate = async(courseEmployeeId) => {
    var nameHeadDept = 'John Doe';
    const code = randomString(5);
    const certificate = await repoGetCertificateByCourseEmp(courseEmployeeId);
    if(certificate != null) {
        return {
            message : 'Sudah generate',
            is_error : false
        };
    }
    const courseEmployee = await repoGetCourseEmpById(courseEmployeeId);
    const user = await repoUserById(courseEmployee.employee_id);
    const headDept = await repoGetHeadOfDept(user.organization.organization_code);
    const course = await repoCourseByID(courseEmployee.course_id);
    if(headDept != null) {
        nameHeadDept = headDept.name;
    }

    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
    });

    function jumpLine(doc, lines) {
        for (let index = 0; index < lines; index++) {
          doc.moveDown();
        }
    }
    doc.pipe(fs.createWriteStream(`certificate/${code}.pdf`));

    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

    doc.fontSize(10);

    // Margin
    const distanceMargin = 18;

    doc
    .fillAndStroke('#F94242')
    .lineWidth(20)
    .lineJoin('round')
    .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2,
    )
    .stroke();

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    doc.image('assets/amt.png', doc.page.width / 2 - maxWidth / 2, 60, {
        fit: [maxWidth, maxHeight],
        align: 'center',
    });

    jumpLine(doc, 5)

    // doc
    // .font('assets/fonts/NotoSansJP-Light.otf')
    // .fontSize(16)
    // .fill('#021c27')
    // .text('PT. Artha Mulia Trijaya', {
    //     align: 'center',
    // });

    // jumpLine(doc, 2)

    // Content
    doc
    .font('assets/fonts/NotoSansJP-Regular.otf')
    .fontSize(16)
    .fill('#021c27')
    .text('CERTIFICATE OF COMPLETION', {
        align: 'center',
    });

    jumpLine(doc, 1)

    doc
    .font('assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Present to', {
        align: 'center',
    });

    jumpLine(doc, 2)

    doc
    .font('assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(24)
    .fill('#021c27')
    .text(user.name, {
        align: 'center',
    });

    jumpLine(doc, 1)

    doc
    .font('assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Successfully completed course', {
        align: 'center',
    });

    doc
    .font('assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(course.course_name, {
        align: 'center',
    });

    jumpLine(doc, 7)

    doc.lineWidth(1);

    // Signatures
    const lineSize = 150;
    const signatureHeight = 390;

    doc.fillAndStroke('#021c27');
    doc.strokeOpacity(0.2);

    const startLine1 = 250;
    const endLine1 = 250 + lineSize;
    doc.image('assets/ttd.png', startLine1, 350, {
        fit: [maxWidth, maxHeight],
    });

    const startLine2 = endLine1 + 32;
    const endLine2 = startLine2 + lineSize;
    doc.image('assets/ttd.png', startLine2, 350, {
        fit: [maxWidth, maxHeight],
    });

    doc
    .font('assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(nameHeadDept, startLine1, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: 'center',
    });

    doc
    .font('assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(`Head Of Dept. ${user.organization.organization_name}`, startLine1, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: 'center',
    });

    doc
    .font('assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Tan Untung Sutikno', startLine2, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: 'center',
    });

    doc
    .font('assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Director', startLine2, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: 'center',
    });

    jumpLine(doc, 2);

    // Validation link
    const link =
    `http://localhost:3001/certificate/${code}`;

    const linkWidth = doc.widthOfString(link);
    const linkHeight = doc.currentLineHeight();

    doc
    .underline(
        doc.page.width / 2 - linkWidth / 2,
        460,
        linkWidth,
        linkHeight,
        { color: '#021c27' },
    )
    .link(
        doc.page.width / 2 - linkWidth / 2,
        460,
        linkWidth,
        linkHeight,
        link,
    );

    doc
    .font('assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(
        link,
        doc.page.width / 2 - linkWidth / 2,
        460,
        linkWidth,
        linkHeight
    );

    // Footer
    const bottomHeight = doc.page.height - 100;

    doc.image('assets/qr.png', doc.page.width / 2 - 30, bottomHeight, {
        fit: [60, 60],
    });

    doc.end();

    const data = {
        course_employee_id : courseEmployeeId,
        code : code       
    };
    await repoCreateCertificate(data);
    return {
        message : 'Berhasil generate',
        is_error : false
    };
}

export const getCertificate = async(req, res) => {
    const data = await generateCertificate(1);
    return res.json(data.message);
}

export const downloadCertificate = async(req, res) => {
    try {
        var path = `./certificate/${req.params.code}.pdf`;
        if(fs.existsSync(path) == false){
            return res.json({
                message : 'File tidak ditemukan',
                is_error : true
            });
        }
        var file = fs.createReadStream(path);
        var stat = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Certificate Code ${req.params.code}.pdf`);
        file.pipe(res);
    } catch(err) {
        return res.json({
            message : errMsg(err),
            is_error : true
        });
    }
}