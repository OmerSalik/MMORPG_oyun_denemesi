export function showMessage(features, icon, fun) {
  if(typeof(features) == 'object') {
    features.title = features.title ? features.title : '';
    features.text = features.text ? features.text : '';
    features.icon = features.icon ? features.icon : 'success';
    features.allowOutsideClick = features.allowOutsideClick ? features.allowOutsideClick : false,
    features.showConfirmButton = features.showConfirmButton ? features.showConfirmButton : false
    Swal.fire({
      title: features.title,
      text: features.text,
      allowOutsideClick: features.allowOutsideClick,
      showConfirmButton: features.showConfirmButton,
      timer: features.timer
    }).then(a => fun ? fun(a) : '');
  } else {
    Swal.fire({
      title: features,
      text: '',
      icon: icon ? icon : 'success',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 1000
    }).then(a => fun ? fun(a) : '');
  }
}