package com.ecommerce.project.reposetories;

import com.ecommerce.project.model.Order;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Double getTotalRevenue();

    @Query(
            value = """
          SELECT DISTINCT o
          FROM Order o
          JOIN o.orderItems oi
          WHERE oi.product.user.id = :sellerId
          """,
            countQuery = """
          SELECT COUNT(DISTINCT o)
          FROM Order o
          JOIN o.orderItems oi
          WHERE oi.product.user.id = :sellerId
          """
    )
    Page<Order> findAllBySellerId(@Param("sellerId") Long sellerId, Pageable pageable);
}