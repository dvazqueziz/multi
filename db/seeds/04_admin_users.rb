ADMIN_USERS_TO_CREATE = 1
progress_bar = ProgressBar.create(title: 'Creating Admin Users', total: ADMIN_USERS_TO_CREATE)

ADMIN_USERS_TO_CREATE.times do
  email = 'admin@example.com'
  if User.find_by(email: email).nil?
    user = User.create!(
      email: email,
      password: 'password',
      api_key: 'lahJOJFDIK',
      name: 'Admin',
      surname: 'Admin',
      locale: 'es',
      confirmed_at: 1.day.ago)
    user.add_role :admin
  end
  progress_bar.increment
end