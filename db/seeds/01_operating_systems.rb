operating_systems = %w[Android iOS Mac Windows Ubuntu]

progress_bar = ProgressBar.create(title: 'Creating OperatingSystem', total: operating_systems.size)

operating_systems.each do |operating_system_name|
  OperatingSystem.find_or_create_by(name: operating_system_name)
  progress_bar.increment
end