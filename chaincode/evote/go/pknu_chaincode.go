package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

// SimpleChaincode example simple Chaincode implementation
type SimpleChaincode struct {
}

// Candidate is
type Candidate struct {
	Name    string `json:"name"`
	Major   string `json:"major"`
	SID     string `json:"sid"`
	College string `json:"college"`
}

// Record is
type Record struct {
	From string `json:"from"`
	To   string `json:"to"`
}

// Vote manage data about one Vote like 2020-IT
type Vote struct {
	Periods    []string    `json:"periods"`
	Candidates []Candidate `json:"candidates"`
	Records    []Record    `json:"records"`
}

/*
Init method is called when the Smart Contract "pknu_chaincode" is instantiated by the blockchain network
Best practice is to have any Ledger initialization in separate function -- see initLedger()
*/
func (t *SimpleChaincode) Init(APIstub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

/*
Invoke method is called as a result of an application request to run the Smart Contract "pknu_chaincode"
The calling application program has also specified the particular smart contract function to be called, with arguments
*/
func (t *SimpleChaincode) Invoke(APIstub shim.ChaincodeStubInterface) pb.Response {
	function, args := APIstub.GetFunctionAndParameters()
	if function == "create" {
		return t.create(APIstub, args)
	} else if function == "enroll" {
		return t.enroll(APIstub, args)
	} else if function == "vote" {
		return t.vote(APIstub, args)
	} else if function == "query" {
		return t.query(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name. Expecting \"create\" \"enroll\" \"vote\"")
}

//	create function put empty voting object into state with given key
//	parameter:
//		args[0]: title of voting
//		args[1]: open time("yyyyMMddHHmmss")
//		args[2]: deadline("yyyyMMddHHmmss")
func (t *SimpleChaincode) create(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	key := args[0]
	isExist, _ := APIstub.GetState(key)

	open := args[1]
	deadline := args[2]

	if isExist != nil {
		return shim.Error("Current key is already exist.")
	}

	vote := Vote{[]string{open, deadline}, []Candidate{}, []Record{}}
	voteAsBytes, _ := json.Marshal(vote)

	APIstub.PutState(key, voteAsBytes)

	return shim.Success(nil)
}

//	enroll register candidate to given voting title
//	parameter:
//		args[0]: title of voting(key)
//		args[1]: candidate's name
//		args[2]: candidate's major
//		args[3]: candidate's sid
//		args[4]: candidate's college
func (t *SimpleChaincode) enroll(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5.")
	}
	voteAsBytes, _ := APIstub.GetState(args[0])

	if voteAsBytes == nil {
		return shim.Error("Not exist such voting title.")
	}

	vote := Vote{}
	json.Unmarshal(voteAsBytes, &vote)

	for _, cand := range vote.Candidates {
		if cand.SID == args[3] {
			return shim.Error("Duplicated SID.")
		}
	}

	cand := Candidate{Name: args[1], Major: args[2], SID: args[3], College: args[4]}
	vote.Candidates = append(vote.Candidates, cand)

	voteAsBytes, _ = json.Marshal(vote)
	APIstub.PutState(args[0], voteAsBytes)

	return shim.Success(nil)
}

//	vote append record to state
//	parameter:
//		args[0]: title of voting(key)
//		args[1]: voter
//		args[2]: candidate
func (t *SimpleChaincode) vote(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3.")
	}

	voteAsBytes, _ := APIstub.GetState(args[0])

	if voteAsBytes == nil {
		return shim.Error("Not exist such voting title.")
	}

	vote := Vote{}
	json.Unmarshal(voteAsBytes, &vote)

	now := time.Now().Format("20060102150405")
	if now < vote.Periods[0] || now >= vote.Periods[1] {
		return shim.Error("It's not a voting period.")
	}

	for _, record := range vote.Records {
		if record.From == args[1] {
			return shim.Error("No duplicate voting allowed.")
		}
	}

	for _, cand := range vote.Candidates {
		if cand.SID == args[2] {
			record := Record{From: args[1], To: args[2]}
			vote.Records = append(vote.Records, record)

			voteAsBytes, _ = json.Marshal(vote)
			APIstub.PutState(args[0], voteAsBytes)

			return shim.Success(nil)
		}
	}

	return shim.Error("Not exist such candidate SID.")
}

//	query return value corresponding to the key
// 	parameter:
//		args[0]: key
func (t *SimpleChaincode) query(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {

	switch len(args) {
	case 1:
		{
			voteAsBytes, _ := APIstub.GetState(args[0])
			return shim.Success(voteAsBytes)
		}
	case 2:
		{
			voteAsBytes, _ := APIstub.GetState(args[0])
			target := args[1]

			vote := Vote{}
			json.Unmarshal(voteAsBytes, &vote)

			total := make(map[string]int)

			if target == "total" {
				for _, cand := range vote.Candidates {
					total[cand.SID] = 0
				}

				for _, record := range vote.Records {
					total[record.To]++
				}
			} else {
				total[target] = 0

				for _, record := range vote.Records {
					if record.To == target {
						total[target]++
					}
				}
			}

			totalAsBytes, _ := json.MarshalIndent(total, "", "  ")

			return shim.Success(totalAsBytes)
		}
	default:
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
}

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
