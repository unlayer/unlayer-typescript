// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as HTMLAPI from './html';
import { HTML, HTMLRetrieveParams, HTMLRetrieveResponse } from './html';
import * as ImageAPI from './image';
import { Image, ImageRetrieveParams, ImageRetrieveResponse } from './image';
import * as PdfAPI from './pdf';
import { Pdf, PdfRetrieveParams, PdfRetrieveResponse } from './pdf';
import * as ZipAPI from './zip';
import { Zip, ZipRetrieveParams, ZipRetrieveResponse } from './zip';

export class Export extends APIResource {
  html: HTMLAPI.HTML = new HTMLAPI.HTML(this._client);
  image: ImageAPI.Image = new ImageAPI.Image(this._client);
  pdf: PdfAPI.Pdf = new PdfAPI.Pdf(this._client);
  zip: ZipAPI.Zip = new ZipAPI.Zip(this._client);
}

Export.HTML = HTML;
Export.Image = Image;
Export.Pdf = Pdf;
Export.Zip = Zip;

export declare namespace Export {
  export {
    HTML as HTML,
    type HTMLRetrieveResponse as HTMLRetrieveResponse,
    type HTMLRetrieveParams as HTMLRetrieveParams,
  };

  export {
    Image as Image,
    type ImageRetrieveResponse as ImageRetrieveResponse,
    type ImageRetrieveParams as ImageRetrieveParams,
  };

  export {
    Pdf as Pdf,
    type PdfRetrieveResponse as PdfRetrieveResponse,
    type PdfRetrieveParams as PdfRetrieveParams,
  };

  export {
    Zip as Zip,
    type ZipRetrieveResponse as ZipRetrieveResponse,
    type ZipRetrieveParams as ZipRetrieveParams,
  };
}
