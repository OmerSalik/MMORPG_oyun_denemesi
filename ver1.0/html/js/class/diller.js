let sozluk = {
  "tr": {
    giris:                    "GİRİŞ",
    kayit:                    "KAYIT",
    kullanici_adi:            "Kullanıcı Adı",
    sifre:                    "Şifre",
    sifre_tekrar:             "Şifre Tekrar",
    hesabin_yok_mu:           "Hesabın yok mu",
    giris_yap:                "Giriş Yap",
    kayit_ol:                 "Kayıt Ol",
    zaten_bir_hesabin_var_mi: "Zaten bir hesabın var mı",
    cikis_yap:                "Çıkış Yap",
  },
  "en": {
    giris:                    "LOGIN",
    kayit:                    "SIGNUP",
    kullanici_adi:            "Username",
    sifre:                    "Password",
    sifre_tekrar:             "Password Again",
    hesabin_yok_mu:           "You have no account",
    giris_yap:                "Log In",
    kayit_ol:                 "Sign Up",
    zaten_bir_hesabin_var_mi: "Do you already have an account",
    cikis_yap:                "Log Out",
  }
}

export function DILLER() { return Object.keys(sozluk); }
export function KELIMELER(dil) { return sozluk[dil]; }