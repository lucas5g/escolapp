export function Logout() {
  setTimeout(() => {

    localStorage.clear()
    location.href = '/login'
  }, 1000)
  return (
    <div>
      Obrigado pela visita :)
    </div>
  )
}