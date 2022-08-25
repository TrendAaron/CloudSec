// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 


contract VehicleRegister {
    bool public newReg = false;

    struct Record{
        uint256 plateNum;
        string ownerName;
        bytes32 regTag;
    }

    struct UniqueTag{
        bytes32 regTag;
        string licenseNum;
    }

    mapping(uint256 => bytes32) private regTagRecord;
    mapping(bytes32 => bool) private regTagRecordExists;
    mapping(bytes32 => UniqueTag) private uniqueIDRecord;

    function regNewVehicle(uint256 _plateNum, string memory _ownerName) public {
        require(newReg, "Sorry, registration is closed");
        Record memory record; 
        record.ownerName = _ownerName;
        record.plateNum = _plateNum;
        record.regTag = keccak256(abi.encode(_plateNum,_ownerName));
        regTagRecord[_plateNum]=record.regTag;
        regTagRecordExists[record.regTag] = true;
    }

    function getregTag(uint256 _plateNum) public view returns (bytes32){        
     require(regTagRecordExists[regTagRecord [_plateNum]]);
        return regTagRecord[_plateNum];
    }

    function getID(bytes32 _regTag, string  memory _licenseNum)public returns (bytes32){
        UniqueTag memory instance;
        instance.regTag = _regTag;
        instance.licenseNum =_licenseNum;
        if (!regTagRecordExists[_regTag]){
            return keccak256(abi.encode("0000"));
        }
        bytes32 _uniqueID = keccak256(abi.encode(_regTag,_licenseNum));
        uniqueIDRecord[_uniqueID]=instance;
        return _uniqueID;
    }

    function regTagCheck(bytes32 _regTag) public view returns (bool){
        return regTagRecordExists[_regTag];
    }
}
