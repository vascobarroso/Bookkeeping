/*
 * ALICE Bookkeeping
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: 0.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

// Specifies the log related filter requirements for a request.
type FilterLogsOptions struct {
	// Name of the author.
	Author string `json:"author,omitempty"`
	Created *FilterLogsCreatedOptions `json:"created,omitempty"`
	Origin *LogOrigin `json:"origin,omitempty"`
	ParentLog int64 `json:"parentLog,omitempty"`
	RootLog int64 `json:"rootLog,omitempty"`
	Tag *FilterLogsTagOptions `json:"tag,omitempty"`
	Title string `json:"title,omitempty"`
}
