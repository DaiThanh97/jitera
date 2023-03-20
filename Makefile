bootstrap-server:
	@echo "==============================Bootstrapping Backend===================================" 
	cd backend && yarn start:dev

	@echo "==============================Bootstrapping Frontend===================================" 
	cd frontend && yarn start

	@echo "==============================Waiting for bootstrapping...============================="
	sleep 10

	@echo "Application is up and running. Now you can access application UI through http://localhost:3000"