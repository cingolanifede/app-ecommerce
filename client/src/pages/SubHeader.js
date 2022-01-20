import React from 'react';
import '../styles/subheader.css';
import mujer from '../images/mujer.png';
import { CheckOutlined, SearchOutlined } from '@ant-design/icons';

const SubHeader = () => {
  return (
    <div>
      <div className="box_title_content">
        <div className="box_home">
          <div className="container">
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="title">Te ayudamos a encontrar el empleo ideal para ti de forma rápida</h2>
        <div data-box-search-container="" className="box_search_content ">
          <ul>
            <li className="sel">Empleos</li>
            <li><a href="https://www.computrabajo.com.ar/empresas/" data-searchbox-companyvaluations="">Evaluaciones <span className="hide_m">de empresa</span></a></li>
          </ul>
          <div>
            <div className="slider-container-transition">
              <div className="box_search slider-item sel">
                <div>
                  <div className="field_input_icon posRel mb0">
                    <div className="cont">
                      <span className="icon i_find"></span>
                      <input id="search-prof-cat-input" type="text" placeholder="Cargo o área" />
                      <span id="clean-prof-cat-button" className="icon i_close hide"></span>
                    </div>
                  </div>

                  <div className="field_input_icon posRel bl1 mb0">
                    <div className="cont">
                      <span className="icon i_address"></span>
                      <input id="search-place-input" type="text" placeholder="Lugar" />
                      <span id="clean-place-button" className="icon i_close hide"></span>
                    </div>
                  </div>
                </div>
                <input id="suggester-prof-cat-url-holder" type="hidden" value="" />
                <input id="suggester-place-url-holder" type="hidden" value="" />
                <button id="suggester-search-button" className="b_primary">
                  <SearchOutlined />
                  <span style={{ paddingLeft: '10px' }}>Buscar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 className="slogan">Ahora el empleo lo eliges tú, más de <span className="fwB">20.656</span> ofertas</h3>
      </div>

      <div className="box b_radius_none posRel">
        <div className="container">
          <div className="tc mbB hide_m">
            <h3 className="fs30">Si buscas trabajo ¡Computrabajo es tu mejor aliado!</h3>
            <p className="fs18 fc_aux mt10">Miles de ofertas de empleo están esperándote</p>
          </div>

          <div className="pAllB">
            <div className="dFlex">
              <div className="prB hide_m" style={{ flex: '440px 0 0' }}>
                <img className="lazy" src={mujer} alt="Imagen" />
              </div>
              <div>
                <p className="fs30">Te ayudamos a encontrar un empleo mejor</p>
                <p className="fs18 fc_aux mb30">Haz que tu currículum sea visible para miles de empresas en nuestra bolsa de trabajo</p>

                <div className="fs16 dFlex mb10">
                  <CheckOutlined />
                  <p>
                    <span className="fwB">Registro gratuito. </span>
                    <span className="fc_aux">Encuentra tu próximo trabajo hoy.</span>
                  </p>
                </div>

                <div className="fs16 dFlex mb10">
                  <CheckOutlined />
                  <p>
                    <span className="fwB">Ofertas cada día.  </span>
                    <span className="fc_aux">Empleos que se ajustan a tu perfil.</span>
                  </p>
                </div>

                <div className="fs16 dFlex mb10">
                  <CheckOutlined />
                  <p>
                    <span className="fwB">Alertas personalizadas. </span>
                    <span className="fc_aux">Tú crea alertas de empleo y nosotros te avisaremos.</span>
                  </p>
                </div>

                <div className="fs16 dFlex mb10">
                  <CheckOutlined />
                  <p>
                    <span className="fwB">Completa tu perfil. </span>
                    <span className="fc_aux">Muéstrate profesional y ganarás visibilidad.</span>
                  </p>
                </div>

                <a href="https://candidato.computrabajo.com.ar/" className="b_primary big mt20">Crea tu cuenta gratis</a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SubHeader;
