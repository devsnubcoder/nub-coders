# Install Certbot if not already installed
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get certificates for all domains
sudo certbot --nginx -d nubcoder.com -d www.nubcoder.com -d build.nubcoder.com -d dockers.nubcoder.com -d api.nubcoder.com
