package main

import (
	"encoding/json"
	"fmt"
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

func main() {
	cand1 := Candidate{Name: "sh", Major: "IT", SID: "201611998", College: "coe"}
	cand2 := Candidate{Name: "qwerty", Major: "IT", SID: "201611944", College: "coe"}

	var cands []Candidate
	cands = append(cands, cand1)
	cands = append(cands, cand2)

	records := []Record{}

	vote1 := Vote{cands, records}

	marshal, _ := json.MarshalIndent(vote1, "", "  ")

	fmt.Println(string(marshal))
}
