export function render(req, res, pageName, pageTitle, data = {}) {
    data['pageTitle'] = `${pageTitle} | Test Server`;
    data['content'] = pageName;
    res.render('template', data);
}
