# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Seeds order on /seeds -> 00_name_seed.rb, 01_name_seed.rb, 02_name_seed.rb
# Always use ProgressBar for your seeds, example:
#
# USERS_TO_CREATE = 20
# progress_bar = ProgressBar.create(title: 'Creating Users', total: USERS_TO_CREATE)
#
# USERS_TO_CREATE.times do
#   User.create(...)
#   progress_bar.increment
# end
puts 'Throwing seeds'
puts '--------------'
puts
Dir[Rails.root.join('db', 'seeds', '*.rb')].sort.each do |file|
  require file
end
