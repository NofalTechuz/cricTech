const uri = {
    baseurl : process.env.BASE_URL || "http://localhost:8000",
    clienturl : process.env.CLIENT_URL || "http://localhost:3000",
}

const origin_urls = process.env.ALLOWED_HOSTS.split(",") || "http://localhost:8000,http://localhost:3000,http://localhost:3001"
console.log(origin_urls)


module.exports = {
    uri,
    origin_urls
}