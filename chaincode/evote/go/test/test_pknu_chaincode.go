package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
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
	Candidates []Candidate `json:"candidates"`
	Records    []Record    `json:"records"`
}

var repository map[string]Vote = make(map[string]Vote)

// Invoke route function
func (t *SimpleChaincode) Invoke(args []string) {
	function := args[0]
	if function == "create" {
		t.createVote(args[1:])
	} else if function == "enroll" {
		t.enroll(args[1:])
	} else if function == "vote" {
		t.vote(args[1:])
	} else if function == "query" {
		t.query(args[1:])
	}
}

// createVote put empty vote data into state with key for given parameter.
func (t *SimpleChaincode) createVote(args []string) {
	if len(args) != 1 {
		fmt.Println("Incorrect number of arguments. Expecting 1.")
		return
	}
	_, ok := repository[args[0]]
	if ok {
		fmt.Println("Duplicated vote.")
		return
	}

	vote := Vote{[]Candidate{}, []Record{}}

	voteAsBytes, _ := json.MarshalIndent(vote, "", "  ")
	repository[args[0]] = vote

	fmt.Println(string(voteAsBytes))
}

// candidate registration
func (t *SimpleChaincode) enroll(args []string) {
	if len(args) != 5 {
		fmt.Println("Incorrect number of arguments. Expecting 5.")
		return
	}
	target, ok := repository[args[0]]

	if !ok {
		return
	}
	for _, cand := range target.Candidates {
		if cand.SID == args[3] {
			fmt.Println("Duplicated SID.")
			return
		}
	}

	cand := Candidate{Name: args[1], Major: args[2], SID: args[3], College: args[4]}
	repository[args[0]] = Vote{append(target.Candidates, cand), target.Records}
}

// vote makes payment of X units from A to B
func (t *SimpleChaincode) vote(args []string) {
	if len(args) != 3 {
		fmt.Println("Incorrect number of arguments. Expecting 3.")
		return
	}
	target, ok := repository[args[0]]
	if !ok {
		return
	}
	for _, cand := range target.Candidates {
		if cand.SID == args[2] {
			record := Record{From: args[1], To: args[2]}
			repository[args[0]] = Vote{target.Candidates, append(target.Records, record)}
			return
		}
	}
	fmt.Println("Not exist such candidate SID.")
}

// query callback representing the query of a chaincode
func (t *SimpleChaincode) query(args []string) {
	if len(args) != 1 {
		fmt.Println("Incorrect number of arguments. Expecting 1.")
		return
	}
	result, ok := repository[args[0]]
	if ok {
		out, _ := json.MarshalIndent(result, "", "  ")
		fmt.Println(string(out))
	} else {
		fmt.Println("not exist.")
	}
}

func main() {
	test := SimpleChaincode{}
	for {
		fmt.Print("$: ")
		in := bufio.NewReader(os.Stdin)
		command, _ := in.ReadString('\n')
		command = command[:len(command)-1]

		args := strings.Split(command, " ")
		test.Invoke(args)
	}
}
