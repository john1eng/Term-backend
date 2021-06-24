function corsFilter(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');


    if (req.method === 'OPTIONS') {
        res.status(200);
    } else {
        next();
    }
}
exports.corsFilter = corsFilter