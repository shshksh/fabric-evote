# init vote data
./scripts/create.sh itvote 20201010000000 20201231000000 itcae itchannel itcc
./scripts/create.sh cevote 20201010000000 20201231000000 ce cechannel cecc
./scripts/create.sh korvote 20201010000000 20201231000000 kor korchannel korcc
./scripts/create.sh engvote 20201010000000 20201231000000 eng engchannel engcc
./scripts/create.sh coevote 20201010000000 20201231000000 itcae coechannel coecc
./scripts/create.sh chssvote 20201010000000 20201231000000 kor chsschannel chsscc
./scripts/create.sh collegevote 20201010000000 20201231000000 itcae collegechannel collegecc

# enroll candidates
./scripts/enroll.sh itvote itcae itchannel itcc rim itcae 201811111 coe
./scripts/enroll.sh cevote ce cechannel cecc min ce 201833333 coe
./scripts/enroll.sh korvote kor korchannel korcc hyeon kor 201855555 chss
./scripts/enroll.sh engvote eng engchannel engcc eun eng 201877777 chss
./scripts/enroll.sh coevote itcae coechannel coecc hun itcae 201711111 coe
./scripts/enroll.sh chssvote kor chsschannel chsscc eun kor 201733333 chss
./scripts/enroll.sh collegevote itcae collegechannel collegecc ju itcae 201611111 coe

./scripts/enroll.sh itvote itcae itchannel itcc jin itcae 201822222 coe
./scripts/enroll.sh cevote ce cechannel cecc hyeon ce 201844444 coe
./scripts/enroll.sh korvote kor korchannel korcc bin kor 201866666 chss
./scripts/enroll.sh engvote eng engchannel engcc hyeon eng 201888888 chss
./scripts/enroll.sh coevote ce coechannel coecc bin ce 201722222 coe
./scripts/enroll.sh chssvote eng chsschannel chsscc sun eng 201744444 chss
./scripts/enroll.sh collegevote kor collegechannel collegecc suk kor 201622222 chss
