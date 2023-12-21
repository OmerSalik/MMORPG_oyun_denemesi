let words = {
  "tr": {
    login:                "GİRİŞ",
    signup:               "KAYIT",
    logout:               "Çıkış",
    username:             "Kullanıcı Adı",
    password:             "Şifre",
    password_again:       "Şifre Tekrar",
    no_account:           "Hesabın yok mu",
    already_have_account: "Zaten bir hesabın var mı",
    log_out:              "Çıkış yap",
    fill_all_fields:      "Boş alan bırakmayınız",
    success:              "BAŞARILI",
    user_not_found:       "Kullanıcı Bulunamadı. Kullanıcı adı veya şifre yanlış",
    do_login:             " Yap",
    do_logout:            " Yap",
    do_signup:            " Ol",
    pass_dont_match:      "Şifreler uyuşmuyor",
    uname_taken:          "Bu kullanıcı adı daha önce alınmış. başka bir tane seç",
  },
  "en": {
    login:                "LOGIN",
    signup:               "SIGNUP",
    logout:               "LOGOUT",
    username:             "Username",
    password:             "Password",
    password_again:       "Password Again",
    no_account:           "You don't have an account",
    already_have_account: "Do you already have an account",
    log_out:              "Log Out",
    fill_all_fields:      "Please fill out all fields",
    success:              "SUCCESS",
    user_not_found:       "User not found. Username or password incorrect",
    do_login:             "",
    do_logout:            "",
    do_signup:            "",
    pass_dont_match:      "Passwords doesn't match",
    uname_taken:          "This username has been chosen before. choose another one",
  }
}

export function LANGUAGES() { return Object.keys(words); }
export function WORDS(language) { return words[language]; }