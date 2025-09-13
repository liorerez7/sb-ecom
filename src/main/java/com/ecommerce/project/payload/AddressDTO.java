package com.ecommerce.project.payload;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// make address documentation that fits USA

@Schema(name = "Address")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {

    @Schema(example = "1")
    private Long AddressId;

    @Schema(example = "123 Main St")
    private String street;

    @Schema(example = "Apt 123")
    private String buildingName;

    @Schema(example = "Montgomery")
    private String city;

    @Schema(example = "Alabama")
    private String state;

    @Schema(example = "USA")
    private String country;

    @Schema(example = "6580000")
    private String zipCode;
}
