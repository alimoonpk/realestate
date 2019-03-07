pragma solidity ^0.5.0;

contract Property {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        uint licenseNumber;
        uint registrationNumber;
        uint size;
        string location;
        uint rooms;
        uint price;
        string ownerName;
        address ownerAddress;
        bytes32 storeHash;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    event verifiedEvent (
        bytes32 hashEvent, bytes32 hashEvent2
    );

    event notVerifiedEvent (
      bytes32 hashEvent, bytes32 hashEvent2
    );

    constructor () public {
        addCandidate("House A", 1234, 1111, 120, "NED", 4, 250, "Ali");
        addCandidate("House B", 2541, 2222, 240, "Johar", 6, 750, "Furqan");
        addCandidate("House C", 1234, 1111, 120, "NED", 4, 250, "Ali");
        addCandidate("House D", 2541, 2222, 240, "Johar", 6, 750, "Furqan");
    }

    function addCandidate (string memory _name, uint _licenseNumber, uint _registrationNumber, uint _size, string memory _location, uint _rooms, uint _price, string memory _ownerName) public {
        candidatesCount ++;
        address senderAddress = msg.sender;
        string memory sin = string(abi.encodePacked(_name,_location,_ownerName));
      // string memory sin = string(abi.encodePacked(candidatesCount, _name, _licenseNumber, _registrationNumber, _size, _location, _rooms, _price, _ownerName, senderAddress));
        bytes32 tempHash = keccak256(abi.encodePacked(sin));
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _licenseNumber, _registrationNumber, _size, _location, _rooms, _price, _ownerName, senderAddress, tempHash);
    }

    function editCandidate (uint _id, string memory _ownerName, address _ownerAddress) public {
        candidates[_id].ownerName = _ownerName;
        candidates[_id].ownerAddress = _ownerAddress;
        string memory sinedit = string(abi.encodePacked(candidates[_id].name, candidates[_id].location, _ownerName));
        bytes32 tempHash = keccak256(abi.encodePacked(sinedit));
        //bytes32 tempHash = keccak256(abi.encodePacked(_id, candidates[_id].name, candidates[_id].licenseNumber, candidates[_id].registrationNumber, candidates[_id].size, candidates[_id].location, candidates[_id].rooms, candidates[_id].price, _ownerName, _ownerAddress));
        candidates[_id].storeHash = tempHash;
        }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    mapping(uint => string) documents;


    function storeDocument(uint id, string memory docHash) public {

        documents[id] = docHash;
    }

    function bytes32ToStr(bytes32 _bytes32) public view returns (string memory){

    // string memory str = string(_bytes32);
    // TypeError: Explicit type conversion not allowed from "bytes32" to "string storage pointer"
    // thus we should fist convert bytes32 to bytes (to dynamically-sized byte array)

    bytes memory bytesArray = new bytes(32);
    for (uint256 i; i < 32; i++) {
        bytesArray[i] = _bytes32[i];
        }
    return string(bytesArray);
    }

    function verifyDocument(uint id, string memory hashToVerify) public returns (bool){
      bytes32 baseHash = candidates[id].storeHash;
      string memory converted = bytes32ToStr(baseHash);
      bytes32 newHash = keccak256(abi.encodePacked(hashToVerify));
          if( baseHash == newHash) {
            emit verifiedEvent(baseHash,newHash);
            return true;
        }
        else{
            emit notVerifiedEvent(baseHash,newHash);
            return false;
        }
     }

     function hashSeriesNumber(string memory sampleToHash) public pure returns (bytes32)
     {
    return  keccak256(abi.encodePacked(sampleToHash));
      }

}
