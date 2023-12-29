import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {FullScreenCard} from '../../components/FullScreenCard'
import { Link } from '../../components/Link'



const AuthLayout = () => {

  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <Outlet />
      </FullScreenCard.Body>  
      <FullScreenCard.BelowCard>
        <Link to={isLoginPage ? "/signup" : "/login"}>
          {isLoginPage ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </Link>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  )

}

export default AuthLayout