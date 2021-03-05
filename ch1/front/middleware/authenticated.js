export default function ({ store, redirect } /* context */) {
  if (!store.state.users.me) { //로그인 한 상태가 아니면
    redirect("/")
  }
}