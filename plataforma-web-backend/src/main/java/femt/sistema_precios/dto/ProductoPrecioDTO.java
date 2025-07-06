package femt.sistema_precios.dto;

public interface ProductoPrecioDTO {
    Long getId();

    String getImagenUrl();

    String getNombre();

    String getUrl();

    Double getPrecio();

    String getTienda();

    String getUrl_base();
}
