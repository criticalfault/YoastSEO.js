/**
 * Represents a text (with optional formatting element(s)) within a document that can be read by a reader.
 *
 * Example (in the case of HTML):
 * ```
 * This text is <strong id="elem-id">very strong</strong>.
 * ```
 * should be transformed to:
 * ```
 * TextContainer {
 *     text: "This text is very strong".
 *     formatting: [
 *         FormattingElement {
 *             type: "strong",
 *             startIndex: 13,
 *             endIndex: 24,
 *             attributes: {
 *                 id: "elem-id"
 *             }
 *         }
 *     ]
 * }
 * ```
 */
class TextContainer {
	/**
	 * A piece of text (with optional formatting element(s)) within a text that can be read by a reader.
	 *
	 * @param {string} text                    The plain text, without any formatting.
	 * @param {FormattingElement[]} formatting The inline formatting elements (e.g. bold text, links, images ) within the text.
	 */
	constructor( text, formatting ) {
		this.text = text;
		this.formatting = formatting;

		this._constrainFormatElementPositionsToEnd( "startIndex" );
		this._constrainFormatElementPositionsToEnd( "endIndex" );
	}

	/**
	 * Constrains the given position (startIndex or endIndex) of this container's formatting elements to the length
	 * of the text if it exceeds it.
	 *
	 * @param {"startIndex"|"endIndex"} position	Which position we need to constrain.
	 * @returns {void}
	 * @private
	 */
	_constrainFormatElementPositionsToEnd( position ) {
		// Check if a formatting element's pos is larger than the length of the text.
		const elem = this.formatting.find( format => format[ position ] > this.text.length );
		if ( elem ) {
			// If so, change its pos to the end of the text and give a warning.
			elem[ position ] = this.text.length;
			console.warn( `'${elem.tag}' element's ${position} position larger than text. It has been set to the end of the text instead.` );
		}
	}
}

export default TextContainer;
