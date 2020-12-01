# init vote data
./scripts/create.sh itcaevote 20201010000000 20201231000000 itcae itcaechannel itcaecc
./scripts/create.sh cevote 20201010000000 20201231000000 ce cechannel cecc
./scripts/create.sh korvote 20201010000000 20201231000000 kor korchannel korcc
./scripts/create.sh engvote 20201010000000 20201231000000 eng engchannel engcc
./scripts/create.sh coevote 20201010000000 20201231000000 itcae coechannel coecc
./scripts/create.sh chssvote 20201010000000 20201231000000 kor chsschannel chsscc
./scripts/create.sh collegevote 20201010000000 20201231000000 itcae collegechannel collegecc

# enroll candidates
./scripts/enroll.sh itcaevote itcae itcaechannel itcaecc 성혜림 itcae 201811111 coe
./scripts/enroll.sh cevote ce cechannel cecc 유지민 ce 201833333 coe
./scripts/enroll.sh korvote kor korchannel korcc 김설현 kor 201855555 chss
./scripts/enroll.sh engvote eng engchannel engcc 이나은 eng 201877777 chss
./scripts/enroll.sh coevote itcae coechannel coecc 이제훈 itcae 201711111 coe
./scripts/enroll.sh chssvote kor chsschannel chsscc 김채은 kor 201733333 chss
./scripts/enroll.sh collegevote itcae collegechannel collegecc 임현주 itcae 201611111 coe

./scripts/enroll.sh itcaevote itcae itcaechannel itcaecc 신유진 itcae 201822222 coe
./scripts/enroll.sh cevote ce cechannel cecc 마찬현 ce 201844444 coe
./scripts/enroll.sh korvote kor korchannel korcc 정다빈 kor 201866666 chss
./scripts/enroll.sh engvote eng engchannel engcc 배주현 eng 201888888 chss
./scripts/enroll.sh coevote ce coechannel coecc 이주빈 ce 201722222 coe
./scripts/enroll.sh chssvote eng chsschannel chsscc 김현순 eng 201744444 chss
./scripts/enroll.sh collegevote kor collegechannel collegecc 이종석 kor 201622222 chss
