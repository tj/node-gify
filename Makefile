
test:
	@./node_modules/.bin/mocha \
		--reporter dot \
		--bail

.PHONY: test