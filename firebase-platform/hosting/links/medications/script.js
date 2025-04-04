let userAgent = navigator.userAgent

const android = document.getElementById('android')
const ios = document.getElementById('ios')

if (/Android/i.test(userAgent)) {
  ios.remove()
} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
  android.remove()
}
