import zxcvbn from 'zxcvbn';
export const indexController = {
    index(req, res) {
        res.render('index', { zxcvbn })
    }
}
