let port = window.location.hostname === 'localhost' ? '5000':window.location.port
export const baseUrl = 'http://' + window.location.hostname + (port == '80' ? '' : (':' + port)) + '/'

// export const baseUrl = 'http://localhost:5000/'