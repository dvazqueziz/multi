USERS_TO_CREATE = 100
progress_bar = ProgressBar.create(title: 'Creating Users', total: USERS_TO_CREATE)

100.times do
  user = User.create!(
    name: ::Faker::Movies::StarWars.character,
    surname: ::Faker::Movies::BackToTheFuture.character,
    email: ::Faker::Internet.email,
    password: ::Faker::Internet.password,
    api_key: ::Faker::Internet.password,
    locale: Settings.locale.default,
    confirmed_at: Time.now,
    tos_agreement: true)
  user.add_role(:user)

  progress_bar.increment
end
