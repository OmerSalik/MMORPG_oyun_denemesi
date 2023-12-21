const server_url = "http://172.16.16.203:3424/",
s = io(server_url),
page = location.href.split(':')[2].split('/')[1] ? location.href.split(':')[2].split('/')[1] : 'index',
bye = (a = null) => {
  // window.location.href = 'https://www.youtube.com';
  localStorage.removeItem('auth');
  alert('bir hata oluştu')
  a != null ? alert(a) : false;
};

s.on('log', text => console.log(text))
s.on('bye', bye)

if(localStorage.getItem('auth')) {
  s.emit('process', { process: 'auth', token: localStorage.getItem('auth') }, res => {
    if(res && page != 'game') location = 'game'
    else if(!res) {
      location = 'login';
      localStorage.removeItem('auth');
    }
  });
} else if (page != 'login') location = 'login';