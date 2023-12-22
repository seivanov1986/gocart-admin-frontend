frontend:
	PUBLIC_URL=/admin REACT_APP_HOST=http://api.3voa.ru npm run build
	cp -r build/* ../docker/bin/schemes/admin/
