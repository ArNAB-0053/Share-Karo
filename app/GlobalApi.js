const { default: axios } = require("axios");

const sendEmail = (data) => axios.post('/api/send', data);

export default { sendEmail }