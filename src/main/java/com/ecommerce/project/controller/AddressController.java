//package com.ecommerce.project.controller;
//
//import com.ecommerce.project.model.User;
//import com.ecommerce.project.payload.AddressDTO;
//import com.ecommerce.project.service.AddressService;
//import com.ecommerce.project.util.AuthUtil;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@Tag(name = "Addresses", description = "Manage user shipping addresses")
//@RestController
//@RequestMapping("/api")
//public class AddressController {
//
//   @Autowired
//   private AuthUtil authUtil;
//
//    @Autowired
//    private AddressService addressService;
//
//    @Operation(summary = "Create address", description = "Create a new address for the authenticated user")
//    @PostMapping("/addresses")
//    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO){
//
//        User user = authUtil.getLoggedInUser();
//        AddressDTO savedAddressDTO = addressService.createAddress(addressDTO, user);
//        return new ResponseEntity<>(savedAddressDTO,HttpStatus.CREATED);
//    }
//
//    @Operation(summary = "Get all addresses")
//    @GetMapping("/addresses")
//    public ResponseEntity<List<AddressDTO>> getAddress(){
//        List<AddressDTO> addressDTOs = addressService.getAllAddresses();
//        return new ResponseEntity<>(addressDTOs, HttpStatus.OK);
//    }
//
//    @GetMapping("/addresses/{addressId}")
//    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId) {
//        AddressDTO addressDTO = addressService.getAddressById(addressId);
//        return new ResponseEntity<>(addressDTO, HttpStatus.OK);
//    }
//
//    @GetMapping("/users/addresses")
//    public ResponseEntity<List<AddressDTO>> getAddressByUserId(){
//        User user = authUtil.getLoggedInUser();
//        List<AddressDTO> addressDTOs = addressService.getAddressesByUser(user);
//        return new ResponseEntity<>(addressDTOs, HttpStatus.OK);
//    }
//
//    @PutMapping("/addresses/{addressId}")
//    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId, @Valid @RequestBody AddressDTO addressDTO) {
//        AddressDTO updatedAddress = addressService.updateAddress(addressId, addressDTO);
//        return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/addresses/{addressId}")
//    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId) {
//        String message = addressService.deleteAddress(addressId);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }
//
//
//}

package com.ecommerce.project.controller;

import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Addresses", description = "Manage user shipping addresses")
@RestController
@RequestMapping("/api")
public class AddressController {

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private AddressService addressService;

    @Operation(
            summary = "Create address",
            description = "Create a new address for the authenticated user.",
            requestBody = @RequestBody(description = "Address payload", required = true)
    )
    @ApiResponse(responseCode = "201", description = "Address created")
    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(
            @Valid @org.springframework.web.bind.annotation.RequestBody AddressDTO addressDTO
    ){
        User user = authUtil.getLoggedInUser();
        AddressDTO savedAddressDTO = addressService.createAddress(addressDTO, user);
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.CREATED);
    }

    @Operation(summary = "List all addresses", description = "Returns all addresses.")
    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> getAddress(){
        List<AddressDTO> addressDTOs = addressService.getAllAddresses();
        return new ResponseEntity<>(addressDTOs, HttpStatus.OK);
    }

    @Operation(summary = "Get address by ID")
    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(
            @Parameter(description = "Address ID", example = "42", required = true)
            @PathVariable Long addressId
    ) {
        AddressDTO addressDTO = addressService.getAddressById(addressId);
        return new ResponseEntity<>(addressDTO, HttpStatus.OK);
    }

    @Operation(summary = "List current user's addresses", description = "Returns addresses for the authenticated user.")
    @GetMapping("/users/addresses")
    public ResponseEntity<List<AddressDTO>> getAddressByUserId(){
        User user = authUtil.getLoggedInUser();
        List<AddressDTO> addressDTOs = addressService.getAddressesByUser(user);
        return new ResponseEntity<>(addressDTOs, HttpStatus.OK);
    }

    @Operation(
            summary = "Update address",
            description = "Update an existing address by ID.",
            requestBody = @RequestBody(description = "Updated address payload", required = true)
    )
    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(
            @Parameter(description = "Address ID", example = "42", required = true)
            @PathVariable Long addressId,
            @Valid @org.springframework.web.bind.annotation.RequestBody AddressDTO addressDTO
    ) {
        AddressDTO updatedAddress = addressService.updateAddress(addressId, addressDTO);
        return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
    }

    @Operation(summary = "Delete address", description = "Delete an address by ID.")
    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<String> deleteAddress(
            @Parameter(description = "Address ID", example = "42", required = true)
            @PathVariable Long addressId
    ) {
        String message = addressService.deleteAddress(addressId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
