export function Logout() {
  setTimeout(() => {

    localStorage.removeItem('accessToken')
    location.href = '/login'
  }, 1000)
  return (
    <div>
      Obrigado pela visita :)
    </div>
  )
}