package gm.inventarios.repository;

import gm.inventarios.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findOneById(Integer idProduct);
}
