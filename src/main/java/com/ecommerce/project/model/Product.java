package com.ecommerce.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    private String productName;
    private String description;
    private Integer quantity;
    private Double price;
    private Double specialPrice;
    private Double discount;
    private String image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User user;

//    @OneToMany(mappedBy = "product", cascade = {
//            CascadeType.PERSIST,
//            CascadeType.MERGE,
//            CascadeType.REMOVE,
//            },fetch = FetchType.EAGER)
//    private List<CartItem> products = new ArrayList<>();

    @OneToMany(
            mappedBy = "product",
            cascade = {
                CascadeType.PERSIST, CascadeType.MERGE
            },
            fetch = FetchType.EAGER
    )
    private List<CartItem> products = new ArrayList<>();

}
