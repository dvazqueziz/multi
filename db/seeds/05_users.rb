USERS_TO_CREATE = 20
progress_bar = ProgressBar.create(title: 'Creating Users', total: USERS_TO_CREATE)

USERS_TO_CREATE.times do
  email = Faker::Internet.email
  if User.find_by(email: email).nil?
    user = User.create!(
      email: email,
      password: Faker::Internet.password(min_length: 8),
      api_key: Faker::Internet.uuid,
      name: Faker::Movies::LordOfTheRings.character,
      surname: Faker::Movies::StarWars.specie,
      locale: 'es',
      confirmed_at: Faker::Number.between(from: 1, to: 365).day.ago)
    user.add_role :user
  end
  progress_bar.increment
end