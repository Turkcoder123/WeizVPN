const servers = [
  { id: 1, name: 'US East', location: 'New York, USA', ip: 'us-east.vpn.example.com', load: 45, status: 'online' },
  { id: 2, name: 'US West', location: 'Los Angeles, USA', ip: 'us-west.vpn.example.com', load: 30, status: 'online' },
  { id: 3, name: 'EU West', location: 'Frankfurt, Germany', ip: 'eu-west.vpn.example.com', load: 60, status: 'online' },
  { id: 4, name: 'EU East', location: 'Warsaw, Poland', ip: 'eu-east.vpn.example.com', load: 20, status: 'online' },
  { id: 5, name: 'Asia East', location: 'Tokyo, Japan', ip: 'asia-east.vpn.example.com', load: 55, status: 'online' },
  { id: 6, name: 'Asia South', location: 'Singapore', ip: 'asia-south.vpn.example.com', load: 35, status: 'online' },
];

exports.getServers = (req, res) => {
  res.json({ servers });
};

exports.getServerById = (req, res) => {
  const server = servers.find(s => s.id === parseInt(req.params.id));
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }
  res.json({ server });
};

exports.connect = (req, res) => {
  const { serverId } = req.body;
  const server = servers.find(s => s.id === parseInt(serverId));

  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }

  res.json({
    message: 'Connected successfully',
    connection: {
      id: require('uuid').v4(),
      server: server.name,
      ip: server.ip,
      connectedAt: new Date().toISOString(),
      status: 'connected',
    },
  });
};

exports.disconnect = (req, res) => {
  res.json({
    message: 'Disconnected successfully',
    disconnectedAt: new Date().toISOString(),
  });
};

exports.getStatus = (req, res) => {
  res.json({
    status: 'disconnected',
    lastConnected: null,
    totalSessions: 0,
  });
};

exports.getUsage = (req, res) => {
  res.json({
    usage: {
      downloaded: 0,
      uploaded: 0,
      total: 0,
      sessionsToday: 0,
    },
  });
};
