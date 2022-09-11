const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: !prod,
    buildExcludes: [/middleware-manifest\.json$/]
})

module.exports = withPWA({
    // next.js config
})
