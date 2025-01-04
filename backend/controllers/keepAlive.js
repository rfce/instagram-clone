
const keepAlive = async (req, res) => {
    res.json({
        success: true,
        message: "✅ Live"
    })
}

module.exports = keepAlive
