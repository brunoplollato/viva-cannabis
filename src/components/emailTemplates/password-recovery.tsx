
type PasswordRecoveryProps = {
  username: string;
  token: string;
}

export default function PasswordRecovery({ username, token }: PasswordRecoveryProps) {
  return (
    <div style={{ padding: '150px', backgroundColor: '#EAF0F3', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=%2Flogo.png&w=256&q=75`} alt="VivaCannabis" />
      <h1 style={{ fontSize: '52px', fontWeight: 400 }}>Esqueceu sua senha?</h1>
      <div style={{ borderRadius: '6px', backgroundColor: '#fff', padding: '64px 100px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <p style={{ fontSize: '24px', color: '#5E5E5E' }}>Olá, {username}, sua conta recebeu um pedido de redefinição de senha recentemente, <br />para mudar sua senha clique no botão abaixo.</p>
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/change-password/${token}`} target="_blank" style={{ fontSize: '14px', padding: '14px 20px', backgroundColor: '#512da8', color: '#fff', fontWeight: 500, borderRadius: '3px', textDecoration: 'none' }}>
          Redefinir senha
        </a>
        <p style={{ fontSize: '24px', color: '#5E5E5E' }}>Caso você não tenha feito esse pedido por favor ignore esse email.<br />
          Obrigado,<br />
          VivaCannabis</p>
      </div>
    </div>
  )
}