import UserEmailForm from "../components/UserProfile/UserEmailForm"
import UserInfoForm from "../components/UserProfile/UserInfoForm"
import UserPasswordForm from "../components/UserProfile/UserPasswordForm"
import WarningAlert from "../components/WarningAlert"

function ProfilePage() {
    return (
        <div className="container py-6 space-y-8">
            <WarningAlert/>
            <UserInfoForm />
            <UserEmailForm/>
            <UserPasswordForm/>
        </div>
    )
}

export default ProfilePage
