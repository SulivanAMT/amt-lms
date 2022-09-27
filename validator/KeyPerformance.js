import { check, validationResult } from "express-validator";

export const validateKeyPerformance = [
    check('target_progress_course')
    .notEmpty()
    .withMessage('Target progress course tidak boleh kosong')
    .isInt({ min : 1, max : 100 })
    .withMessage('Progress course minimal 1% dan maksimal 100%'),

    check('target_average_exam')
    .notEmpty()
    .withMessage('Target rata rata nilai ujian tidak boleh kosong')
    .isInt({ min : 1, max : 100 })
    .withMessage('Rata rata ujian minimal 1 dan maksimal 100'),

    check('period_year')
    .notEmpty()
    .withMessage('Tahun periode tidak boleh kosong'),

    check('organization_code')
    .notEmpty()
    .withMessage('Organisasi tidak boleh kosong'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.json({
                message : errors.array(),
                is_error : true
            });
        }
        next();
    }
];

export default validateKeyPerformance