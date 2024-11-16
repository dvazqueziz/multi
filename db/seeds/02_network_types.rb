network_types = [
  { code: 'unknown', name: 'Desconocida' },
  { code: 'wifi', name: 'Wi-Fi' },
  { code: 'wwan', name: 'Datos móviles' }
]

progress_bar = ProgressBar.create(title: 'Creating NetworkTypes', total: network_types.size)

network_types.each do |network_type|
  NetworkType.find_or_create_by(code: network_type[:code], name: network_type[:name])
  progress_bar.increment
end
