namespace :db do

  namespace :seed do

    task mock: :environment do
      Dir[Rails.root.join('db', 'seeds', 'mock', '*.rb')].sort.each do |file|
        require file
      end
    end

  end

end