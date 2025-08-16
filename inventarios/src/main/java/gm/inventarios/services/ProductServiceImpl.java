package gm.inventarios.services;

import gm.inventarios.entity.Product;
import gm.inventarios.exception.NotFoundRecurse;
import gm.inventarios.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> listAllProducts() {
        List<Product> productsList = productRepository.findAll();
        if (productsList.isEmpty()) {
            throw new NotFoundRecurse("No existen productos");
        }
        return productsList;
    }

    @Override
    public Product selectOneById(Integer idProduct) {
        Product product = productRepository.findOneById(idProduct);
        if (product == null) {
            throw new NotFoundRecurse("No existe el producto con id: " + idProduct);
        }
        return product;
    }

    @Override
    public Product saveProduct(Product product) {
        Product productDB = productRepository.findOneById(product.getId());
        if (productDB != null) {
            throw new NotFoundRecurse("Ya existe un producto con el id: " + product.getId());
        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Integer id, Product product) {
        Product productUpdated = productRepository.findOneById(id);
        if (productUpdated == null) {
            throw new NotFoundRecurse("No existe el producto con id: " + id);
        }
        productUpdated.setDescription(product.getDescription());
        productUpdated.setSize(product.getSize());
        productUpdated.setPrice(product.getPrice());
        productUpdated.setStock(product.getStock());
        return productRepository.save(productUpdated);
    }

    @Override
    public void deleteProduct(Integer idProduct) {
        Product product = productRepository.findOneById(idProduct);
        if (product == null) {
            throw new NotFoundRecurse("No existe el producto con id: " + idProduct);
        }
        productRepository.delete(product);
//        try {
//            productRepository.deleteById(idProduct);
//        } catch (Exception e) {
//            throw new NotFoundRecurse("No existe el producto con id: " + idProduct);
//        }
    }
}
