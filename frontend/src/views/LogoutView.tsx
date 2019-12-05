import { connect } from 'react-redux'
import { setLoggedInUser } from 'src/actions'
import { useEffect } from 'react'

const mapDispatchToProps = {
  logoutUserAction: setLoggedInUser,
}

type Props = typeof mapDispatchToProps

const LogoutViewComponent = ({ logoutUserAction }: Props) => {
    useEffect(() => {
        logoutUserAction(null)
    })

    return null
}

const LogoutView = connect(
  null,
  mapDispatchToProps
)(LogoutViewComponent)

export { LogoutView }
