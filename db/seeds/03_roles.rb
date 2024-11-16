roles = [
  {
    name: :admin,
    full_name: 'Administrador'
  },
  {
    name: :user,
    full_name: 'Usuario'
  },
]

progress_bar = ProgressBar.create(title: 'Creating Roles', total: roles.size)

roles.each do |role|
  Role.find_or_create_by(name: role[:name],
                         full_name: role[:full_name])
  progress_bar.increment
end
