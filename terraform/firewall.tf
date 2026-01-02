resource "google_compute_firewall" "allow_internal" {
  name    = "allow-internal"
  network = google_compute_network.gke_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "icmp"
  }

  source_ranges = [
    "10.10.0.0/16",
    "10.20.0.0/16",
    "10.30.0.0/16"
  ]
}

resource "google_compute_firewall" "allow_ssh_http_https" {
  name    = "allow-ssh-http-https"
  network = google_compute_network.gke_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22", "80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
}